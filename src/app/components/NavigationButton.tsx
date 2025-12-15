import "./NavigationButton.css";
import Link from "next/link";
import Image from "next/image";

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
          <Image
            className="arrow-normal"
            src="/ArrowYellowOrange.svg"
            alt="Arrow"
            width={40}
            height={40}
            loading="lazy"
            sizes="40px"
          />
          <Image
            className="arrow-hover"
            src="/ArrowWhite.svg"
            alt="Arrow"
            width={40}
            height={40}
            loading="lazy"
            sizes="40px"
          />
        </div>
      )}
      <p>{text}</p>
      {!arrowLeft && (
        <div className="arrow-wrapper">
          <Image
            className="arrow-normal"
            src="/ArrowYellowOrange.svg"
            alt="Arrow"
            width={40}
            height={40}
            loading="lazy"
            sizes="40px"
          />
          <Image
            className="arrow-hover"
            src="/ArrowWhite.svg"
            alt="Arrow"
            width={40}
            height={40}
            loading="lazy"
            sizes="40px"
          />
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
