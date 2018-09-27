import React, { Component } from 'react';
import axios from 'axios';

import config from '../../config';
// import langID from '../../lang/id.json';
import langEN from '../../lang/en.json';
import { LoginMockData, OTPMockData } from '../../mockData';
import logo from '../../assets/images/logo_yukstay.svg';

import Auth from '../../helper/auth'

import { loginUser } from '../../modules/auth';

import DotArea from './components/DotArea';

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			phone: '',
			errorMessage: '',
			otp: '',
			errorMessageOTP: '',
			APILoginResponse: {},
			APIVerifyResponse: {},
			currentShow: 'login'	// login / verify
		};

		if(Auth.isLoggedIn()) {
      this.props.history.push({ pathname: '/dashboard' });
    }
	}

	/* -----------------
	 * LIFE CYCLE
	 * -----------------
	 */
	componentDidMount() {
		// this.fetch();
	}



	/* -----------------
	 * ACTIONS
	 * -----------------
	 */
	doValidating = (target) => {
		if (target === '' || target.length < 5 || target.length > 15 || isNaN(target)) {
			return langEN.homePage.errorMessage.phone;
		}

		return '';
	}

	doValidatingOTP = (target) => {
		if (target === '' || isNaN(target)) {
			return langEN.homePage.errorMessage.otp;
		}

		return '';
	}

	doGetOTP = (postData) => {
		if (config.mockData) {
			this.processResponseLogin({ data: LoginMockData });
		} else {
			axios.post(config.API.login, postData)
				.then((response) => {
					this.processResponseLogin(response);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}

	doVerifyOTP = (postData) => {
		if (config.mockData) {
			this.processResponseOTP({ data: OTPMockData });
		} else {
			axios.post(config.API.loginVerifyOTP, postData)
				.then((response) => {
					this.processResponseOTP(response);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}

	processResponseLogin = response => {
		this.setState({
			APILoginResponse: response.data,
			currentShow: 'verify'
		});
	}

	processResponseOTP = response => {
		console.log(response);
		const setState = {};

		setState.APIVerifyResponse = response.data;

		//--Checking Whether Return Error or Success
		if (response.data.statusCode === 500) {
			const setState = {};

			setState.errorMessageOTP = response.data.error.message;
		} else {
			Auth.registerLogin(response.data.result);

			//--Redirect to Dashboard
			this.props.history.push({ pathname: '/dashboard' });
		}

		this.setState(setState);
	}



	/* -----------------
	 * HANDLER
	 * -----------------
	 */
	onHandleClickButtonGetOTP = () => {
		const { phone } = this.state;
		const { loginUser } = this.props;
		const setState = {};

		setState.errorMessage = this.doValidating(phone);
		
		this.setState(setState, () => {
			if (setState.errorMessage === '') {
				loginUser();
				// this.onHandleSubmitGetOTP();
			}
		});
	}

	onHandleChangePhone = e => {
		let { phone } = this.state;
		const setState = {};
		
		//--Fill Value to State
		phone = e.target.value;
		setState.phone = phone;
		setState.errorMessage = this.doValidating(phone);

		this.setState(setState);
	}

	onHandleSubmitGetOTP = () => {
		const { phone } = this.state;
		const obj = {
			phone
		};

		this.doGetOTP(obj);
	}

	onHandleChangeOTP = e => {
		let { otp } = this.state;
		const setState = {};
		
		//--Fill Value to State
		otp = e.target.value;
		setState.otp = otp;
		setState.errorMessageOTP = this.doValidatingOTP(otp);

		this.setState(setState);
	}
	
	onHandleClickButtonVerifyOTP = () => {
		const { otp } = this.state;
		const setState = {};

		setState.errorMessageOTP = this.doValidatingOTP(otp);
		
		this.setState(setState, () => {
			if (setState.errorMessageOTP === '') {
				this.onHandleSubmitVerifyOTP();
			}
		});
	}

	onHandleSubmitVerifyOTP = () => {
		const { otp, APILoginResponse } = this.state;
		const obj = {
			phone: APILoginResponse.result.phone,
			mfa: otp,
			session: APILoginResponse.result.session
		};

		this.doVerifyOTP(obj);
	}

	onHandleClickButtonChangePhone = () => {
		this.setState({ currentShow: 'login' });
	}

	render() {
		const { phone, otp, errorMessage, errorMessageOTP, currentShow } = this.state;

		return (
			<div className="home-page clearfix">
				<div className="picture-area"></div>
				<div className="sidebar-area">
					<img className="logo" src={logo} alt="logo-yukstay" />
					
					<div className="box-form-area">
						{/* --- Login Form Area --- */}
						<div className={`login-form-area ${currentShow !== 'verify' ? 'show' : ''}`}>
							<div className="title">{langEN.homePage.title}</div>
							<div className="subtitle">{langEN.homePage.subtitle}</div>

							<div className="login-form">
								<form onSubmit={this.onHandleSubmitGetOTP}>
									<label>{langEN.homePage.labelPhone}</label>
									<div className="login-box">
										<input type="text" onChange={this.onHandleChangePhone} value={phone} placeholder="ex: +6281299098870"/>
										<button type="button" onClick={this.onHandleClickButtonGetOTP}>Next</button>
									</div>
									<div className="error">{errorMessage}</div>
								</form>
							</div>
						</div>

						{/* --- Verify OTP Form Area --- */}
						<div className={`verify-form-area ${currentShow === 'verify' ? 'show' : ''}`}>
							<div className="title">{langEN.homePage.otpTitle}</div>
							<div className="subtitle">{langEN.homePage.otpSubtitle}</div>

							<div className="login-form">
								<form onSubmit={this.onHandleSubmitVerifyOTP}>
									<label>{langEN.homePage.otpLabel}</label>
									<div className="login-box">
										<input type="text" onChange={this.onHandleChangeOTP} value={otp} placeholder="ex: 000000"/>
										<button type="button" onClick={this.onHandleClickButtonVerifyOTP}>Submit</button>
									</div>
									<div className="error">{errorMessageOTP}</div>
									<div className="extra-action">
										<button type="button" className="btn-resend" onClick={this.onHandleClickButtonGetOTP}>Resend</button>
										<button type="button" className="btn-change-phone" onClick={this.onHandleClickButtonChangePhone}>Change phone number?</button>
									</div>
								</form>
							</div>
						</div>
					</div>

					<DotArea currentShow={ currentShow === 'verify' ? true : false } />
				</div>
			</div>
		);
	}
}

export default Login;
// const mapStateToProps = state => ({
// });

// const mapDispatchToProps = dispatch =>
// 	bindActionCreators({
// 		loginUser
// 	}, dispatch);

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Login);
