"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "@/styles/landing.module.css";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className={styles.landing}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.logo}>TASK MANAGER</div>
        <div>
          <button className={styles.loginBtn} onClick={() => router.push("/users/login")}>Login</button>
          <button className={styles.signupBtn} onClick={() => router.push("/users/register")}>Get Started</button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>Quản lý công việc dễ dàng với Task Manager</h1>
          <p className={styles.subtitle}>Tổ chức công việc hiệu quả với nhóm của bạn.</p>
          <div className={styles.form}>
            <input type="email" placeholder="Enter your email" className={styles.input} />
            <button className={styles.button} onClick={() => router.push("/users/register")}>Sign Up - Its Free!</button>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image src="/home.png" alt="Task Manager Preview" width={500} height={300} className={styles.image} />
        </div>
      </div>
    </div>
  );
}
