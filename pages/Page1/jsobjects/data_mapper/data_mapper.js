export default {
	data: {
		assessment_Name: assessmentName.text,
		assessment_des: assessmentDescription.text,
		assessment_nature: natureOfAssessment.text,
		assessment_level: assessmentLevel.selectedOptionValue,
		assessment_status: status.selectedOptionValue,
		assessment_category: assessmentCategory.text,
		assessment_is_hot: isHotAssessment.selectedOptionValue,
		assessment_priority: priority.text,
		assessment_qustion_type: questionsType.selectedOptionValue,
		assessment_ext: extensionId.text,
		assessment_skillIds: skillIds.text,
		assessment_fullScreen: enableFullScreen.selectedOptionValue,
		assessment_access_type: accessType.selectedOptionValue,
		assessment_table_prohibited_url: Table_prohibited_urls.tableData,
		assessment_meta_info_form: assessmentMetaInfo.formData,
		assessment_instruction_form: instruction.formData,
		assessment_section_selected: Tab.selectedTab,

		// dynamic obbject for assement creation

		// for assessment Without Section and Pool
		assessment_section_questionIds: questionIds_table.tableData,

		// pool config & No Section
		assessment_section_questionBankID_Pool : questionBankId.text,
		assessment_section_numberOfQuestion_pool : numberOfQuestion.text,
		assessment_section_queryList_pool: queryList.tableData,

		// with section not pool
		assessment_section_sectionList: Section_data.formData


	},
	async trustMe() {
		const {
			assessment_Name,
			assessment_des,
			assessment_nature,
			assessment_level,
			assessment_status,
			assessment_category,
			assessment_is_hot,
			assessment_priority,
			assessment_qustion_type,
			assessment_ext,
			assessment_skillIds,
			assessment_fullScreen,
			assessment_access_type,
			assessment_table_prohibited_url,
			assessment_instruction_form,
			assessment_section_selected,
			assessment_section_questionIds,
			assessment_section_questionBankID_Pool,
			assessment_section_numberOfQuestion_pool,
			assessment_section_queryList_pool,
			assessment_section_sectionList,
			assessment_meta_info_form
		} = this.data;

		let dynamic_key = {};


		if (assessment_section_selected.trim() === "Without Section") {
			dynamic_key = {
				questionIds: assessment_section_questionIds.map((question) => question.questionIds),
			};
		} else if (assessment_section_selected.trim() === "Pool_config&No_Section") {
			dynamic_key = {
				questionBankId: assessment_section_questionBankID_Pool,
				numberOfQuestion: parseInt(assessment_section_numberOfQuestion_pool, 10),
				queryList: assessment_section_queryList_pool,
			};
		} else if (assessment_section_selected.trim() === "Add Section") {
			dynamic_key = {
				sectionList: assessment_section_sectionList.sectionList.map((section) => ({
					skillIds: assessment_skillIds.split(",").map(Number),
					thresholdForPassing: parseInt(section.thresholdForPassing, 10),
					name: section.name ,
					questionBankId: section.questionBankId,
					numberOfQuestion: parseInt(section.numberOfQuestion, 10),
					queryList: section.queryList.map((query) => ({
						difficulty: query.difficulty ,
						questionType: query.questionType,
						skillId: parseInt(query.skillId, 10),
						duration: parseInt(query.duration, 10),
						count: parseInt(query.count, 10),
					})),
					instruction: {
						title: section.instruction.title || null,
						description: section.instruction.description || null,
						instructionInfoList: section.instruction.instructionInfoList.map((info) => ({
							title: info.title || null,
							instructionList: info.instructionList.map((item) =>
          item.instruction
        ),
						})),
					},
				})),
				enableSection: true,
			};
		}


		const formattedData = {
			assessmentName: assessment_Name,
			assessmentDescription: assessment_des,
			natureOfAssessment: assessment_nature,
			assessmentLevel: assessment_level,
			//meta info 
			
			 // "assessmentMetaInfo": assessment_meta_info_form,
			
			 "assessmentMetaInfo":{
        "title": assessment_meta_info_form.title,
        "description": assessment_meta_info_form.description,
        "instructionInfoList": [
            assessment_meta_info_form.instructionInfoList
        ]
    },
			
			//assessment instruction
			instruction: {
				title: assessment_instruction_form.instruction.title,
				description: assessment_instruction_form.instruction.description,
				instructionInfoList: assessment_instruction_form.instruction.instructionInfoList.map((info) => ({
					title: info.title,
					instructionList: info.instructionList,
				})),
			},
			status: assessment_status,
			assessmentCategory: assessment_category,
			isHotAssessment: assessment_is_hot,
			priority: parseInt(assessment_priority, 10),
			questionsType: assessment_qustion_type,
			extensionId: assessment_ext,
			skillIds: assessment_skillIds.split(",").map(Number),
			enableFullScreen: assessment_fullScreen,
			accessType: assessment_access_type,
			prohibitedUrls: assessment_table_prohibited_url.map((urlObj) => urlObj.prohibitedUrls),
			...dynamic_key,
		};

		return formattedData;
	}

};