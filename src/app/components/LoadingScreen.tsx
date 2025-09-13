// components/LoadingScreen.tsx
import styles from "./LoadingScreen.module.css";

const LoadingScreen = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <p>読み込み中...</p>
    </div>
  );
};

export default LoadingScreen;