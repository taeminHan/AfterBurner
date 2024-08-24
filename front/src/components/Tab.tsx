
export const Tab = ({key, name}: {key: number,name: string}) => {
    return (
        <div key={key} className="tab">
            <p className={'tab-text'}>{name}</p>
        </div>
    );
}
