import React, {useRef} from "react";

const CheckBox = (props) => {
	const inputRef = useRef(null);

	const onChange = () => {
		if (props.onChange) {
			console.log(inputRef.current.checked);
			props.onChange(inputRef.current);
		}
	};
	return (
		<div>
			<label className="custom-checkbox">
				<input
					type="checkbox"
					ref={inputRef}
					onChange={onChange}
					checked={props.checked}
				/>
				<span className="custom-checkbox__checkmark">
					<i className="bx bx-check"></i>
				</span>
				{props.label}
			</label>
		</div>
	);
};

export default CheckBox;
