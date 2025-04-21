# Document Similarity Checker

A modern web application for detecting duplicate or similar text documents, built with React and FastAPI.

## 🌐 Live Demo

- Frontend: [https://plagrism.vercel.app/](https://plagrism.vercel.app/)
- Backend API: [https://plagrism-backend-1.onrender.com/](https://plagrism-backend-1.onrender.com/)
- API Documentation: [https://plagrism-backend-1.onrender.com/docs](https://plagrism-backend-1.onrender.com/docs)

## 📋 Features

- Upload multiple text documents (TXT, PDF, DOC, DOCX)
- Compare documents for similarity
- Real-time progress tracking during comparison
- Dark/Light mode support
- Responsive design
- API health status monitoring
- Interactive UI with Material-UI components
- Detailed similarity results with color-coded scores

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- Python (v3.8 or higher)
- npm or yarn

### Frontend Setup

1. Clone the repository:
```bash
git clone https://github.com/Tonystarq/plagrism.git
cd plagrism
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

### Backend Setup

1. Clone the backend repository:
```bash
git clone https://github.com/Tonystarq/plagrism_backend.git
cd plagrism_backend
```

2. Create and activate virtual environment:
```bash
python -m venv venv
# On Windows
.\venv\Scripts\activate
# On Unix or MacOS
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Start the server:
```bash
uvicorn main:app --reload
```

## 🛠️ Tech Stack

### Frontend
- React.js
- Material-UI
- React Dropzone
- Axios
- React Context API

### Backend
- FastAPI
- Python
- TF-IDF Vectorization
- Cosine Similarity
- CORS Middleware

## 📦 Key Components

### Frontend Components
1. **FileUpload**
   - Drag and drop file upload
   - File type validation
   - Loading states

2. **FileList**
   - Display uploaded files
   - File type icons
   - Delete and clear functionality

3. **ResultsTable**
   - Similarity score display
   - Color-coded results
   - Interactive table

4. **Layout**
   - Responsive design
   - Dark/Light mode toggle
   - API status indicator

### API Services
1. **Document Comparison**
   - Endpoint: `/compare`
   - Method: POST
   - Input: Two text files
   - Output: Similarity score and status

2. **Health Check**
   - Endpoint: `/`
   - Method: GET
   - Output: API status

## 🔧 API Documentation

The API documentation is available at [https://plagrism-backend-1.onrender.com/docs](https://plagrism-backend-1.onrender.com/docs)

### API Endpoints

#### Compare Documents
```http
POST /compare
Content-Type: multipart/form-data

file1: [file]
file2: [file]
```

Response:
```json
{
    "status": "success",
    "similarity_score": 0.85,
    "message": "Documents compared successfully"
}
```

#### Health Check
```http
GET /
```

Response:
```json
{
    "message": "Document Similarity API is running"
}
```

## 🎨 UI Features

- Modern Material-UI design
- Responsive layout
- Dark/Light mode support
- Interactive animations
- Progress indicators
- Error handling
- Loading states
- Tooltips and notifications

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop
- Tablet
- Mobile devices

## 🔒 Security Features

- File type validation
- Error handling
- API health monitoring
- Secure file handling

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- [@Tonystarq](https://github.com/Tonystarq)

## 🙏 Acknowledgments

- Material-UI for the component library
- FastAPI for the backend framework
- React for the frontend framework
