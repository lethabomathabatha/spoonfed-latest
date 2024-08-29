import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function Carousel() {

  return (
    <>
        {/* Carousel */}
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
            <div className="carousel-inner" style={{ height: '530px' }}>
                <div className="carousel-item active d-flex flex-col justify-content-center ">
                    <img 
                        src='https://images.pexels.com/photos/5807021/pexels-photo-5807021.jpeg' 
                        className="d-block w-100" 
                        alt="Pasta with green leaf on black plate" 
                        loading="lazy" 
                    />
                    <div className="carousel-caption d-flex flex-column justify-content-center align-items-center">
                        <h5>Delicious Pasta</h5>
                        <p>Enjoy a delightful pasta dish with fresh ingredients.</p>
                    </div>
                </div>
                <div className="carousel-item d-flex justify-content-center align-items-center">
                    <img 
                        src='https://images.pexels.com/photos/5807021/pexels-photo-5807021.jpeg' 
                        className="d-block w-100" 
                        alt="Pasta with green leaf on black plate" 
                        loading="lazy" 
                    />
                    <div className="carousel-caption d-flex flex-column justify-content-center align-items-center">
                        <h5>Fresh Ingredients</h5>
                        <p>Only the best and freshest ingredients used.</p>
                    </div>
                </div>
                <div className="carousel-item d-flex justify-content-center align-items-center">
                    <img 
                        src='https://images.pexels.com/photos/5807021/pexels-photo-5807021.jpeg' 
                        className="d-block w-100" 
                        alt="Pasta with green leaf on black plate" 
                        loading="lazy" 
                    />
                    <div className="carousel-caption d-flex flex-column justify-content-center align-items-center">
                        <h5>Healthy Meals</h5>
                        <p>Perfect for a nutritious and balanced diet.</p>
                    </div>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    </>
  );
}
