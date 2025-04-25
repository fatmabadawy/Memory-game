import a from '../assets/a.jpg';


export default function Card({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
   
      <div className={flipped ? "flipped card" : "card"}>
        <img className="front" src={card.src} />
        <img
          className="back"
          src={a} 
          onClick={handleClick}
          
        />
      </div>
    
  );
}
