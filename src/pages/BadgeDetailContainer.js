import React, {Component} from 'react';
import './styles/BadgeDetails.css';
import BadgeDetail from './BadgeDetail';
import api from '../Api';
import PageLoading from "../components/PageLoading";

export default class BadgeDetailContainer extends Component {
    state = {
        loading: true,
        error: null,
        data: undefined,
        modalIsOpen: false,
    };

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        this.setState({loading: true, error: null});
        try {
            const data = await api.badges.read(this.props.match.params.badgeId);
            this.setState({loading: false, data: data});
        } catch (error) {
            this.setState({loading: false, error: error});
        }
    };

    handleOpenModal = e => {
        this.setState({modalIsOpen: true})
    };
    handleCloseModal = e => {
        this.setState({modalIsOpen: false})
    };
    handleDeleteBadge = async e => {
        this.setState({loading: true, error: null})
        try {
            await api.badges.remove(
                this.props.match.params.badgeId
            );
            this.props.history.push('/badges')
        } catch (error) {
            this.setState({loading: false, error: error})
        }
    };

    render() {
        if (this.state.loading) {
            return <PageLoading/>
        }
        return (<BadgeDetail onCloseModal={this.handleCloseModal}
                             onOpenModal={this.handleOpenModal}
                             modalIsOpen={this.state.modalIsOpen}
                             onDeleteBadge={this.handleDeleteBadge}
                             badge={this.state.data}/>);
    }
}