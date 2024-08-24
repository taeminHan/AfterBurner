export const Item = ({name, price, count}: {name: string, price: number, count: number}) => {
    return (
        <div className="item">
            <p className="item-name">{name}</p>
            <p className="item-price">{price}원</p>
            <p className="item-count">{count}</p>
        </div>
    )
}