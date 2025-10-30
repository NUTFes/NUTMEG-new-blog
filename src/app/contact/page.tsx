"use client";

import React from "react";
import Form from "next/form";
import { postAction } from "@/app/contact/postAction";
import styles from '@/app/contact/contact.module.css';

export default function ContactPage() {
  return (
    <>
      <header className={styles.contactHeader}>
        <h1 className="text-4xl font-extrabold tracking-tight leading-tight">Contact</h1>
        <p>お問い合わせ</p>
      </header>

      <div className={styles.contactContainer}>
        <Form action={postAction} className={styles.contactForm}>
          <div className="userName">
            <label htmlFor="name">お名前または団体者名</label>
            <input type="text" id="name" name="name" placeholder="お名前" />
          </div>
          <div className="userEmail">
            <label htmlFor="email">ご連絡先</label>
            <input type="text" id="email" name="email" placeholder="ご連絡先" />
          </div>
          <div className="userInquiry">
            <label htmlFor="inquiry">お問い合わせ内容</label>
            <textarea id="inquiry" name="inquiry" placeholder="お問い合わせ内容をご記入ください" />
          </div>
          <div className="contactFormSubmit">
            <button type="submit" className={styles.submitButton}>送信</button>
          </div>
        </Form>
      </div>
    </>
  );
}
