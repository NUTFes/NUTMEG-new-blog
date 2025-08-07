import Image from "next/image";
import "./TeamCard.css";

type TeamProps = {
  name: string;
  description: string;
  technologies: string[];
  pm: { name: string; icon: string };
};

const TeamCard: React.FC<TeamProps> = ({ name, description, technologies, pm }) => {
  return (
    <div className="card">
      <div className="card-padding">
        <h2 className="card-title">{name}</h2>
        <p className="card-abstract">{description}</p>

        <div className="card-section tech-inline">
          <h3 className="section-title">使用技術：</h3>
          <div className="card-tags">
            {technologies.map((tech, index) => (
              <span key={index} className="tag">{tech}</span>
            ))}
          </div>
        </div>

        <div className="card-section pm-inline">
          <h3 className="section-title">PM：</h3>
          <div className="pm-info">
            <Image src={pm.icon} alt={pm.name} width={30} height={30} className="pm-icon" />
            <span className="pm-name">{pm.name}</span>
          </div>
        </div>

        <div className="ArrowBox">
          <Image src="/Arrow.svg" alt="Arrow" className="Arrow" height={40} width={40} />
        </div>
        
      </div>
    </div>
  );
};

export default TeamCard;