import Image from "next/image";
import "./BlogCard.css"; // CSS ファイルをインポート
import { DEFAULT_BLUR_DATA_URL } from "../lib/imagePlaceholder";

interface CardProps {
  thumbnail: string;
  tags: string[];
  title: string;
  abstract: string;
  authorIcon: string;
  authorName: string;
  date: string;
  link: string;
}

const Card = ({
  thumbnail,
  tags,
  title,
  abstract,
  link,
}: CardProps) => {
  return (
    <a href={link} className="card">
      <Image
        src={thumbnail}
        alt={title}
        width={318}
        height={179}
        className="card-thumbnail"
        placeholder="blur"
        blurDataURL={DEFAULT_BLUR_DATA_URL}
        loading="lazy"
      />
      <div className="card-padding">
        <p className="card-abstract">{abstract}</p>
        <div className="card-tags">
          {tags.map((tag, index) => (
            <span key={index} className="tag">{"#" + tag}</span> 
          ))}
        </div>
        {/* <div className="ArrowBox">
          <Image src="/Arrow.svg" alt="Arrow" className="Arrow" height={40} width={40}/>
        </div> */}
      </div>
    </a>
  );
};

export default Card;
