import React, { Component } from 'react';

export class Search extends Component {
    static displayName = Search.name;
    constructor(props) {
        super(props);
        this.state = { area_id: '', severity: [], event_type: [], created: '' };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAreaIdChange = this.handleAreaIdChange.bind(this);
        this.handleSeverityChange = this.handleSeverityChange.bind(this);
        this.handleEventTypeChange = this.handleEventTypeChange.bind(this);
        this.handleCreatedChange = this.handleCreatedChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        let area_id = this.state.area_id;
        let severity = this.state.severity;
        let event_type = this.state.event_type;
        let created = this.state.created;
        this.props.onSubmit(area_id, severity, event_type, created);
    }

    handleAreaIdChange(event) {
        this.setState({ area_id: event.target.value });
    }

    handleSeverityChange(event) {
        var options = event.target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        this.setState({ severity: value });
    }

    handleEventTypeChange(event) {
        var options = event.target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        this.setState({ event_type: value });
    }

    handleCreatedChange(event) {
        this.setState({ created: event.target.value });
    }

    render() {
        const areas = this.props.areas;
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="col">
                        <label htmlFor="area">Area</label>
                        <select className="form-control" id="area_id" value={this.state.area_id} onChange={this.handleAreaIdChange}>
                            <option>ALL</option>
                            {areas.map(area =>
                                <option key={area.id} value={area.id}>{area.name}</option>
                            )}
                        </select>
                    </div>
                    <div className="col">
                        <label htmlFor="severity">Severity</label>
                        <select multiple className="form-control" id="severity" value={this.state.severity} onChange={this.handleSeverityChange}>
                            <option></option>
                            <option>MINOR</option>
                            <option>MODERATE</option>
                            <option>MAJOR</option>
                        </select>
                    </div>
                    <div className="col">
                        <label htmlFor="event_type">Event Type</label>
                        <select multiple className="form-control" id="event_type" value={this.state.eventType} onChange={this.handleEventTypeChange}>
                            <option></option>
                            <option>CONSTRUCTION</option>
                            <option>INCIDENT</option>
                            <option>SPECIAL_EVENT</option>
                            <option>WEATHER_CONDITION</option>
                        </select>
                    </div>
                    <div className="col">
                        <label htmlFor="start_date">Start Date (created)</label>
                        <input className="form-control" id="created" type="date" value={this.state.created} onChange={this.handleCreatedChange} />
                    </div>
                    <div className="col mt-4 pt-2">
                        <button type="submit" id="search" className="btn btn-primary">Search</button>
                    </div>
                </div>
            </form>
        );
    }
}
