import React, { Component } from 'react';
import axios from 'axios';
import get from 'lodash/get';
// import hellosign from 'hellosign-embedded';

import config from '../../config';
import { OwnerContractMockData, OwnerDataMockData } from '../../mockData';
import TopNavbar from './components/TopNavbar';
import HeaderInfo from './components/HeaderInfo';
import TableContent from './components/TableContent';
import BasePopup from './components/BasePopup';
import Docusign from './components/Docusign';
import ListView from './components/ListView';

import Auth from '../../helper/auth'

class Dashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			APIOwnerData: OwnerDataMockData,
			APIOwnerContract: OwnerContractMockData,
			isLogin: false,
			loadedOwner: false,
			loadingOwner: false,
			loadedContract: false,
			loadingContract: false,
			popupDocusign: true,
			popupViewing: false
		};

		if (!Auth.isLoggedIn()) {
			this.processInvalidCreds();
		}

		this.initHelloSign();
	}

	componentDidMount() {
		this.hellosign = require('hellosign-embedded');
		this.initHelloSign();
		
		this.doGetOwnerData();
		this.doGetOwnerContract();
	}

	initHelloSign = () => {
		const CLIENT_ID = 'e8bef94dd5a2e23cf4e32bfd9de4fd4a';

		this.hellosign.init(CLIENT_ID);
	}

	doGetOwnerData = () => {
		if (config.mockData) {
			this.processResponseOwnerData({ data: OwnerDataMockData });
		} else {
			this.setState({
				loadingOwner: true
			}, () => {
				axios({
					method: 'GET',
					url: config.API.ownerData,
					data: '',
					headers: {
						'Authorization': Auth.getAuthorizationHeader(),
					},
				})
					.then((response) => {
						if (response.data.statusCode === 401) {
							return this.processInvalidCreds();
						}

						this.setState({ loadingOwner: false, loadedOwner: true }, () => {
							this.processResponseOwnerData(response);
						});
					})
					.catch((error) => {
						console.log(error);
					});
			});
		}
	}

	doGetOwnerContract = () => {
		if (config.mockData) {
			this.processResponseOwnerContract({ data: OwnerContractMockData });
		} else {
			this.setState({
				loadingContract: true
			}, () => {
				axios({
					method: 'GET',
					url: config.API.ownerContract,
					data: '',
					headers: {
						'Authorization': Auth.getAuthorizationHeader(),
					},
					// json: true
				}).then((response) => {
					if (response.data.statusCode === 401) {
						return this.processInvalidCreds();
					}

					this.setState({ loadingContract: false, loadedContract: true }, () => {
						this.processResponseOwnerContract(response);
					});
				}).catch((error) => {
					console.log(error);
				});
			});
		}
	}

	processInvalidCreds = response => {
		Auth.logout();

		this.props.history.push('/')
	}

	processResponseOwnerData = response => {
		const setState = {};

		setState.APIOwnerData = response.data;

		this.setState(setState);
	}

	processResponseOwnerContract = response => {
		const setState = {};

		setState.APIOwnerContract = response.data;

		//--Checking Whether Return Error or Success
		if (response.data.statusCode === 500) {
			const setState = {};

			setState.errorMessageOTP = response.data.error.message;
		} else {

		}

		this.setState(setState);
	}

	handleDocusign = () => {
		this.setState(prevState => ({ popupDocusign: !prevState.popupDocusign }));
	};

	handleViewing = () => {
		this.setState(prevState => ({ popupViewing: !prevState.popupViewing }));
	};

	onHandleProceedSigning = () => {
		this.hellosign.open({
			url: 'https://app.hellosign.com/editor/embeddedSign?signature_id=4e6104e12e939051a4441badb8341985&token=b24f6e86f507d29d52286d618e95a911',
			allowCancel: true,
			debug: true,
			skipDomainVerification: true
		});
	}

	render() {
		const { APIOwnerData, APIOwnerContract } = this.state;

		const list = APIOwnerContract.result.list;
		const totalView = list[0].fields.viewingCount;
		const partnerAgreement = list[0].fields.partnerAgreement;

		const helloSign = partnerAgreement.fields.hellosign ? partnerAgreement.fields.hellosign : null;

		return (
			<div className="dashboard-wrapper">
				{
					helloSign.isComplete ? (
						<React.Fragment>
							<TopNavbar />
							<HeaderInfo
								name={get(APIOwnerData, 'result.fields.name', 'Guest').split(' ')[0]}
								totalView={totalView || 0}
								partnerAgreement={partnerAgreement}
								onHandleViewing={this.handleViewing}
							/>

							<TableContent dataContent={list || []} />

							<BasePopup showPopup={this.state.popupViewing} animation="fade-in" >
								<ListView onHandleViewing={this.handleViewing} />
							</BasePopup>
						</React.Fragment>
					) : (
							<BasePopup showPopup={true} animation="fade-in" >
								<Docusign onHandleCancelled={this.handleDocusign} onHandleProceed={this.onHandleProceedSigning} />
							</BasePopup>
						)
				}
			</div>
		);
	}

}

export default Dashboard;