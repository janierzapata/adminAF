import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as smtpTransport from 'nodemailer-smtp-transport';
import * as process from "process";
import * as Handlebars from 'handlebars';
import * as fs from 'fs';


@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;
  private emailTemplate: Handlebars.TemplateDelegate;

  constructor() {
    this.transporter = nodemailer.createTransport(smtpTransport({
      host: process.env.HOST_MAIL_SENDER,
      port:  parseInt(process.env.PORT_MAIL_SENDER),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.USER_MAIL_SENDER, // tu dirección de correo electrónico de Gmail
        pass: process.env.PASSWORD_MAIL_SENDER, // tu contraseña de Gmail
      },
      tls: {
        // Indicar a nodemailer que inicie la capa de seguridad de transporte (TLS)
        // Si el servidor de correo requiere una conexión segura, esto se establecerá automáticamente
        // Para Gmail, la autenticación y el cifrado TLS/SSL se requieren siempre
        rejectUnauthorized: false // No verificar el certificado del servidor de correo
      }
    }));
    // Cargar y compilar la plantilla de correo
    const templatePath = 'src/shared/templates/verificationEmail/email-template.hbs';
    const templateContent = fs.readFileSync(templatePath, 'utf8');
    this.emailTemplate = Handlebars.compile(templateContent);
  }

  async sendEmail(to: string, subject: string, text: string) {
    try {
      const html = this.emailTemplate({ subject, text });
      // Enviar correo con HTML renderizado
      const info = await this.transporter.sendMail({
        from: process.env.USER_MAIL_SENDER,
        to,
        subject,
        html, // Enviar HTML en lugar de texto plano
      });
      console.log('Message sent: %s', info);
      return info;
    } catch (error) {
      console.error('Error occurred while sending email:', error);
    }
  }
}
