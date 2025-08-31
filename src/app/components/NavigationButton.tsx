// NavigationButton.tsx
import Link from "next/link";
import "./NavigationButton.css";

interface NavigationButtonProps {
  text: string;
  href: string;
}

const NavigationButton = ({ text, href }: NavigationButtonProps) => {
  return (
    <Link href={href} className="navigation-button">
      <p>{text}</p>
      <div className="arrow-wrapper">
        <img className="arrow-normal" src="/ArrowYellowOrange.svg" alt="Arrow" width={40} height={40} />
        <img className="arrow-hover" src="/ArrowWhite.svg" alt="Arrow" width={40} height={40} />
      </div>
    </Link>
  );
};

export default NavigationButton;
