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
  authorIcon,
  authorName,
  date,
  link,
}) => {
  return (
    <a href={link} className="card">
      <Image src={thumbnail} alt={title} width={300} height={200} className="card-thumbnail" />
      <div className="card-content">
        <div className="card-tags">
          {tags.map((tag, index) => (
            <span key={index} className="tag">{"#" + tag}</span> 
          ))}
        </div>
        <h2 className="card-title">{title}</h2>
        <p className="card-abstract">{abstract}</p>
        <div className="card-footer">
            <div className="author-info">
                <Image src={authorIcon} alt={authorName} width={40} height={40} className="author-icon" />
                <span className="author-name">{authorName}</span>
            </div>
            <span className="date">{date}</span>
            </div>
      </div>
    </a>
  );
};

export default Card;