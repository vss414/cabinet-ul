import React from 'react';

import './DocumentsPage.less';
import Dropdown from 'react-dropdown';
import '../styles/dropdown.less';

const DocumentsPage = React.createClass({
    render() {
        return (
            <div className='DocumentsPage'>
            {(this.props.options.length) ?
                <div>
                    <div className="title">Показать документы за период</div>
                    <div className="form">
                        <div className="dropdown">
                            <Dropdown
                                value={this.props.selectValue}
                                options={this.props.options}
                                onChange={this.props.select}
                                placeholder="Выберите дату"
                            />
                        </div>
                        <div className="documents">
                            { this.props.displayedDocuments.map((el, i) => (
                                <a key={i} href='#' onClick={(event) => this.props.download(event, el)}> {el} </a>
                            ))}
                        </div>
                    </div>
                </div>
                :
                <div className="title">Нет доступных документов для скачивания</div>
                }
            </div>
        );
    }
});

export default DocumentsPage;
