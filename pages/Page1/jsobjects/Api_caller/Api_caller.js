export default {
	async ModelButton2onClick() {
		try {
			await data_mapper.trustMe();
			await Assessment_api.run();
			dynamictext.setText(Assessment_api.data.message);
			dynamictext.setTextColor("green")
			Button2.setDisabled(true)
			return Assessment_api.data;

		} catch (error) {
			console.error("An error occurred:", error);
			dynamictext.setText(Assessment_api.data.error);
			showAlert(Assessment_api.data.error, "error");
			dynamictext.setTextColor("red")
			Button2.setLabel("Try Again")
		}
	}
};
