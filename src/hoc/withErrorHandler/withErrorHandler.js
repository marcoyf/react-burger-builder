import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = ( WrappedComponent, axios ) => {
    // returning an anonymous class
    return class extends Component {
        state = {
            error: null
        }

        componentDidMount () {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                // just to clear the error state
                this.setState({error: null});
                return req;
            });
            // returning the response: res => res
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        // the withErrorHandler function returns a new Component class everytime it's used, which is then used by Axios
        // componentWillUnmount will do the memory cleanup to get rid of all unused Axios interceptors
        componentWillUnmount() {
            console.log('componentWillUnmount method was called', this.reqInterceptor, this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render () {
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;