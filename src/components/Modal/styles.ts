import Modal from "styled-react-modal";

export const StyledModal = Modal.styled`
	width: 450px;
	@media (max-width: 480px) {
		width: 300px;
		justify-content: center;
		padding: 20px;
		text-align: center;
	}
	height: 250px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: var(--d-gray);
	border-radius: 4px;
	position: relative;
	.modalContent{
		color: #fff;
		font-size: 20px;
		div {
			margin-bottom: 5px;
		}
		.buttonCloseModal {
			width: 30px;
			height: 30px;
			border-radius: 50%;
			background: var(--background);
			border: 1px solid gray;
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			top: -10px;
			right: -10px;
			cursor: pointer;
		}
	}
`;
