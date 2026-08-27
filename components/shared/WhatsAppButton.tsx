import styles from "./whatsapp-button.module.css";

const WHATSAPP_NUMBER = "17869811712";
const WHATSAPP_MESSAGE = "Hello Snapp Editt, I have a question.";

export default function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <a
      className={styles.button}
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Snapp Editt on WhatsApp"
      title="Chat on WhatsApp"
    >
      <svg className={styles.icon} viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="12.5" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <path
          d="M11.7 10.9c.4-.4 1-.4 1.4 0l1.6 2c.3.4.3.9 0 1.3l-.8.9c.8 1.7 2.1 3 3.8 3.8l.9-.8c.4-.3.9-.3 1.3 0l2 1.6c.4.4.4 1 0 1.4l-.8.8c-.6.6-1.5.9-2.3.7-4.7-1.1-8.4-4.8-9.5-9.5-.2-.8.1-1.7.7-2.3l.8-.8Z"
          fill="currentColor"
        />
      </svg>
    </a>
  );
}