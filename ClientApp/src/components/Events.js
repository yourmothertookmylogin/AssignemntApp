import React, { Component } from 'react';
import Moment from 'moment';

export class Events extends Component {
    static displayName = Events.name;

    render() {
        const events = this.props.events;
        if (events && events.length > 0) {
            return (
                <div className="row">
                    <div className="col">
                        <p>Displaying {events.length} results</p>
                        <table className='table table-striped' aria-labelledby="tabelLabel">
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>event type</th>
                                    <th>status</th>
                                    <th>severity</th>
                                    <th>created</th>
                                    <th>updated</th>
                                    <th>description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {events.map(event =>
                                    <tr key={event.id}>
                                        <td>{event.id}</td>
                                        <td>{event.event_type}</td>
                                        <td>{event.status}</td>
                                        <td>{event.severity}</td>
                                        <td>{Moment(event.created).format('YYYY-MM-DD h:mm a')}</td>
                                        <td>{Moment(event.updated).format('YYYY-MM-DD h:mm a')}</td>
                                        <td>{event.description}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="row">
                    <div className="col text-center">
                        <em>No events found, please change filtering criteria and try again</em>
                    </div>
                </div>
                );
        }
    }
}


