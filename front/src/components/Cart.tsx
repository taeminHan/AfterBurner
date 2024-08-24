import {Hr} from "./Hr.tsx";
import {Item} from "./Item.tsx";
import {NoItem} from "./NoItem.tsx";


export const testItem = [
    {name: 'item1', price: 1000, count: 1},
    {name: 'item2', price: 2000, count: 2},
]

export const Cart = ({userName}: {userName: string}) => {
    return (
        <>
            <div className={'content-flex'}>
                <p style={{fontWeight: 'bold', fontSize: 20}}>{userName} Cart</p>
                <p style={{marginLeft: 300, fontSize: 15, marginTop: 25}}>Total: </p>
            </div>
            <div className={'content-flex'}>
                <div>
                    {
                        userName === 'hackseoul2' ?
                            <NoItem/>:
                        testItem.map((item, index) => {
                            return (
                                <>
                                    <div className={'content-flex'}>
                                        <div className={'img'}/>
                                            <Item key={index} name={item.name} price={item.price} count={item.count}/>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </div>
            <Hr/>
        </>
    )
}
