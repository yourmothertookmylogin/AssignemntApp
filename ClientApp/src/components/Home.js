import React, { Component } from 'react';
import { Search } from './Search';
import { Events } from './Events';
import Moment from 'moment';

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePrevious = this.handlePrevious.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.state = {
            search: {
                area_id: '', severity: [], event_type: [], created: ''
            },
            areas: [],
            events: [],
            next: true,
            loading: true
        };
    }

    componentDidMount() {
        this.populateAreasData();
    }

    async handleSubmit(area_id, severity, event_type, created) {
        if (created !== '') {
            created = `>=${Moment(created).utc().toISOString()}`;
        }
        const endpoint = `event?area_id=${encodeURIComponent(area_id)}&severity=${encodeURIComponent(severity.join(','))}&event_type=${encodeURIComponent(event_type.join(','))}&created=${created}&offset=0&limit=100`;
        const response = await fetch(endpoint);
        const data = await response.json();
        console.log("events", data);
        console.log("endpoint", endpoint);
        this.setState({
            search: { area_id, severity, event_type, created },
            events: data.events,
            next: data.events.length > 0
        });
    }

    async handlePrevious() {
        const area_id = this.state.search.area_id;
        const severity = this.state.search.severity;
        const event_type = this.state.search.event_type;
        const created = this.state.search.created;
        const page = this.state.page - 1;
        this.handleSubmit(area_id, severity, event_type, created, page);
    }

    async handleNext() {
        const area_id = this.state.search.area_id;
        const severity = this.state.search.severity;
        const event_type = this.state.search.event_type;
        const created = this.state.search.created;
        const page = this.state.page + 1;
        this.handleSubmit(area_id, severity, event_type, created, page);
    }

    render() {
        let search = this.state.loading
            ? <p><em>Loading...</em></p>
            : <Search areas={this.state.areas} onSubmit={this.handleSubmit} />;
        return (
            <div>
                {search}
                <div className="row">
                    <div className="col"><em>&nbsp;</em></div>
                </div>
                <Events events={this.state.events} page={this.state.page} next={this.state.next} onPrevious={this.handlePrevious} onNext={this.handleNext} />
            </div>
        );
    }

    async populateAreasData() {
        const response = await fetch('area');
        const data = await response.json();
        console.log("areas", data);

        this.setState({ areas: data.areas, loading: false });
    }
}
