import React, { Component } from 'react';
import Personal from './Personal';
import Education from './Education';
import Experience from './Experience';

class CVForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            personalImage: null,
            name: '',
            email: '',
            phoneNumber: '',
            schoolName: '',
            studyTitle: '',
            studyDate: '',
            companyName: '',
            positionTitle: '',
            tasks: '',
            workFrom: '',
            workUntil: '',
            isEditing: true,
        };
    }

    handleImageChange = (e) => {
        const file = e.target.files[0];
        this.setState({ personalImage: file });
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ isEditing: false });
    };

    handleEdit = () => {
        this.setState({ isEditing: true });
    };

    handleDownload = () => {
        const {
            name,
            email,
            phoneNumber,
            schoolName,
            studyTitle,
            studyDate,
            companyName,
            positionTitle,
            tasks,
            workFrom,
            workUntil,
        } = this.state;

        const cvContent = `Name: ${name}
            Email: ${email}
            Phone Number: ${phoneNumber}
            School Name: ${schoolName}
            Study Title: ${studyTitle}
            Study Date: ${studyDate}
            Company Name: ${companyName}
            Position Title: ${positionTitle}
            Tasks: ${tasks}
            Work From: ${workFrom}
            Work Until: ${workUntil}`;

        const blob = new Blob([cvContent], { type: 'text/plain' });

        const url = URL.createObjectURL(blob);

        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = 'cv.txt';

        document.body.appendChild(downloadLink);
        downloadLink.click();

        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(url);
    };

    render() {
        const {
            name,
            email,
            phoneNumber,
            schoolName,
            studyTitle,
            studyDate,
            companyName,
            positionTitle,
            tasks,
            workFrom,
            workUntil,
            personalImage,
            isEditing,
        } = this.state;

        return (
            <div className="CVForm">
                <h1>CV Form</h1>

                {isEditing ? (
                    <form onSubmit={this.handleSubmit}>
                        <Personal
                            name={name}
                            email={email}
                            phoneNumber={phoneNumber}
                            personalImage={personalImage}
                            handleChange={this.handleChange}
                            handleImageChange={this.handleImageChange}
                        />
                        <Education
                            schoolName={schoolName}
                            studyTitle={studyTitle}
                            studyDate={studyDate}
                            handleChange={this.handleChange}
                        />
                        <Experience
                            companyName={companyName}
                            positionTitle={positionTitle}
                            tasks={tasks}
                            workFrom={workFrom}
                            workUntil={workUntil}
                            handleChange={this.handleChange}
                        />

                        <button type="submit">Generate CV Preview</button>
                    </form>
                ) : (
                    <div>
                        <h2>CV Preview</h2>
                        <p>Name: {name}</p>
                        <p>Email: {email}</p>
                        <p>Phone Number: {phoneNumber}</p>
                        <p>School Name: {schoolName}</p>
                        <p>Study Title: {studyTitle}</p>
                        <p>Study Date: {studyDate}</p>
                        <p>Company Name: {companyName}</p>
                        <p>Position Title: {positionTitle}</p>
                        <p>Tasks: {tasks}</p>
                        <p>Work From: {workFrom}</p>
                        <p>Work Until: {workUntil}</p>
                        <button onClick={this.handleEdit}>Edit</button>
                    </div>
                )}
            </div>
        );
    }
}

export default CVForm;
