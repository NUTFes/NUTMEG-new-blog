import "./NavigationButton.css";
import Image from "next/image";
import Link from "next/link";
import { DEFAULT_BLUR_DATA_URL } from "../lib/imagePlaceholder";

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
            placeholder="blur"
            blurDataURL={DEFAULT_BLUR_DATA_URL}
            loading="lazy"
          />
          <Image
            className="arrow-hover"
            src="/ArrowWhite.svg"
            alt="Arrow"
            width={40}
            height={40}
            placeholder="blur"
            blurDataURL={DEFAULT_BLUR_DATA_URL}
            loading="lazy"
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
            placeholder="blur"
            blurDataURL={DEFAULT_BLUR_DATA_URL}
            loading="lazy"
          />
          <Image
            className="arrow-hover"
            src="/ArrowWhite.svg"
            alt="Arrow"
            width={40}
            height={40}
            placeholder="blur"
            blurDataURL={DEFAULT_BLUR_DATA_URL}
            loading="lazy"
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
