import {Tabs} from "../components/Tabs.tsx";
import {Hr} from "../components/Hr.tsx";
import {Progressbar} from "../components/Progressbar.tsx";
import {Cart} from "../components/Cart.tsx";
import {BottomNav} from "../components/BottomNav.tsx";


export const ParticipantPage = () => {


    return (
        <>
            <div>
                <Tabs/>
                <Hr/>
                <p style={{fontWeight: 'bold'}}>로켓배송</p>
                <Progressbar/>
                <Hr/>
                <p style={{fontWeight: 'bold', fontSize: 12}}>신선식품 무조건 무료배송</p>
                <p style={{fontSize: 12}}>최소주문금액 없이, 오늘 장보기는 로켓프레시에서!</p>
                <div className={'container-flex'}>
                    <input type={'button'} className={'rocket-button'} value={'로켓프레시 둘러보기'}/>
                </div>
                <Hr/>
                <p style={{fontWeight: 'bold', fontSize: 15}}>로켓배송 상품</p>
                <p style={{display: 'flex', fontSize: 12}}>와우는 무조건 빠른배송・무료배송・무료반품</p>
                <Hr/>
                <div className={'container-flex'}>
                    <input type={'button'} className={'invite-large'} value={'Cancel Order Together'}/>
                </div>
                <Hr/>
                <div className={'content-flex'}>
                    <p style={{fontWeight: 'bold', fontSize: 20}}>My Cart</p>
                    <p style={{marginLeft: 300, fontSize: 15, marginTop: 25}}>Total: {}</p>
                </div>
                <div className={'container-flex'}>
                    <input className={'add-cart'} type={'button'} value={'Add Item'}/>
                </div>
                <div className={'container'}>
                    <input className={'add-cart-rocket'} type={'button'} value={'로켓배송 추가하기'}/>
                </div>
                <Hr/>
                <Cart userName={'hackseoul1'}/>
                <Cart userName={'hackseoul2'}/>
                <BottomNav/>
            </div>
        </>
    )
}