import "./NavigationButton.css";
import Link from "next/link";

interface NavigationButtonProps {
  text: string;
  href?: string; // href は任意に
  onClick?: () => void; // クリック時の関数を渡せるように
  arrowLeft?: boolean;
}

const NavigationButton = ({ text, href, onClick, arrowLeft = false }: NavigationButtonProps) => {
  const content = (
    <>
      {arrowLeft && (
        <div className="arrow-wrapper left">
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
    </>
  );

  if (onClick) {
    return (
      <button className="navigation-button" onClick={onClick}>
        {content}
      </button>
    );
  }

  return (
    <Link href={href || "#"} className="navigation-button">
      {content}
    </Link>
  );
};

export default NavigationButton;
