const Confirm = (props: { onConfirm: () => void; onCancel: () => void; text: string }) => {
	return (
		<div className="confirm">
			<div className="confirm__text">{props.text}</div>
			<div className="confirm__items">
				<div className="confirm__items_item" onClick={props.onCancel}>
					No
				</div>
				<div className="confirm__items_item" onClick={props.onConfirm}>
					Yes
				</div>
			</div>
		</div>
	);
};

export default Confirm;
