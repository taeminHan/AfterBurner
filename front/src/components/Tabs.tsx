import {Tab} from "./Tab";

const tabData = [
    { name: '일반구매' },
    { name: '자주산상품' },
    { name: '찜한상품(0)' },
    { name: '정기배송(0)' },
];


export const Tabs = () => {
    return (
        <div className="tabs">
            {tabData.map((el, index) => (
                <Tab key={index} name={el.name} />
            ))}
        </div>
    );
};
