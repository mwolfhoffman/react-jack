import CardsUpComponent from "./cards-up.component";

export default function CardComponent({card}){
return(
    <>
    <span className="card-container-key">Card:</span>
    <span className="card-container-value">
    {card.name || card.value}
    </span>
    <span className="card-container-key">Suit: </span>
    <span className="card-container-value">{card.suit}</span>
    </>
)
}