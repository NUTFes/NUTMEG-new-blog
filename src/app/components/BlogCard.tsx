import Image from "next/image";
import "./BlogCard.css"; // CSS ファイルをインポート

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

const Card: React.FC<CardProps> = ({
  thumbnail,
  tags,
  title,
  abstract,
  link,
}) => {
  return (
    <a href={link} className="card">
      <Image src={thumbnail} alt={title} width={318} height={179} className="card-thumbnail" />
      <div className="card-padding">
        <p className="card-abstract">{abstract}</p>
        <div className="card-tags">
          {tags.map((tag, index) => (
            <span key={index} className="tag">{"#" + tag}</span> 
          ))}
        </div>
        <div className="ArrowBox">
          <Image src="/Arrow.svg" alt="Arrow" className="Arrow" height={40} width={40}/>
        </div>
      </div>
    </a>
  );
};

export default Card;