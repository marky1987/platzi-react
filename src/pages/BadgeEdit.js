import React from 'react'
import Badge from '../components/Badge'
import BadgeForm from '../components/BadgeForm'
import header from '../images/platziconf-logo.svg'
import './styles/BadgeEdit.css'
import api from "../Api";

export default class BadgeEdit extends React.Component {
    state = {
        loading: true,
        error: null,
        form: {
            firstName: '',
            lastName: '',
            email: '',
            avatarUrl: '',
            jobTitle: '',
            twitter: ''
        }
    };
    handleChange = e => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            }
        });
    };
    handleSubmit = async e => {
        e.preventDefault();
        this.setState({loading: true, error: null});
        try {
            await api.badges.update(this.props.match.params.badgeId, this.state.form);
            this.setState({loading: false});
            this.props.history.push('/badges');
        } catch (error) {
            this.setState({loading: false, error: error});
        }

    };

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async e => {
        this.setState({loading: true, error: null});
        try {
            const data = await api.badges.read(this.props.match.params.badgeId);
            this.setState({loading: false, form: data})
        } catch (error) {
            this.setState({loading: false, error: error});
        }

    };

    render() {
        return <React.Fragment>
            <div className="BadgeEdit__hero">
                <img className="img-fluid BadgeEdit__hero-image" src={header} alt=""/>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <Badge firstName={this.state.form.firstName || 'FIRST_NAME'}
                               lastName={this.state.form.lastName || 'LAST_NAME'}
                               jobTitle={this.state.form.jobTitle || 'JOB_TITLE'}
                               twitter={this.state.form.twitter || 'TWITTER'}
                               email={this.state.form.email || 'EMAIL'}
                               avatarUrl={this.state.form.avatarUrl}/>
                    </div>
                    <div className="col-6">
                        <h1>Edit Attendant</h1>
                        <BadgeForm onChange={this.handleChange}
                                   onSubmit={this.handleSubmit}
                                   formValues={this.state.form}/>
                    </div>
                </div>
            </div>
        </React.Fragment>
    }
}
