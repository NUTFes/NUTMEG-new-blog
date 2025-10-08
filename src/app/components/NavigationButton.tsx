import Link from "next/link";
import "./NavigationButton.css";

interface NavigationButtonProps {
  text: string;
  href: string;
  arrowLeft?: boolean; // 左矢印かどうか
}

const NavigationButton = ({ text, href, arrowLeft = false }: NavigationButtonProps) => {
  return (
    <Link href={href} className="navigation-button">
      {arrowLeft && (
        <div className="arrow-wrapper left"> {/* left クラスを追加 */}
          <img className="arrow-normal" src="/ArrowYellowOrange.svg" alt="Arrow" width={40} height={40} />
          <img className="arrow-hover" src="/ArrowWhite.svg" alt="Arrow" width={40} height={40} />
        </div>
      )}
      <p>{text}</p>
      {!arrowLeft && (
        <div className="arrow-wrapper">
          <img className="arrow-normal" src="/ArrowYellowOrange.svg" alt="Arrow" width={40} height={40} />
          <img className="arrow-hover" src="/ArrowWhite.svg" alt="Arrow" width={40} height={40} />
        </div>
      )}
    </Link>
  );
};

export default NavigationButton;
