import CartIcon from './../../assets/cart-dark.svg'
import WishlistIcon from './../../assets/wishlist.svg'

export default function BestProductSection() {
    return (
        <>
            <section className="pb-5">
                <div className="container-lg">

                    <div className="row">
                        <div className="col-md-12">

                            <div className="section-header d-flex flex-wrap justify-content-between my-4">

                                <h2 className="section-title">Best selling products</h2>

                                <div className="d-flex align-items-center">
                                    <a href="#" className="btn btn-primary rounded-1">View All</a>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">

                            <div className="product-grid row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5">

                                <div className="col">
                                    <div className="product-item">
                                        <figure>
                                            <a href="index.html" title="Product Title">
                                                <img src="images/product-thumb-1.png" alt="Product Thumbnail" className="tab-image" />
                                            </a>
                                        </figure>
                                        <div className="d-flex flex-column text-center">
                                            <h3 className="fs-6 fw-normal">Whole Wheat Sandwich Bread</h3>
                                            <div>
                                                <span className="rating">
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-half"></use></svg>
                                                </span>
                                                <span>(222)</span>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <del>$24.00</del>
                                                <span className="text-dark fw-semibold">$18.00</span>
                                                <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">10% OFF</span>
                                            </div>
                                            <div className="button-area p-3 pt-0">
                                                <div className="row g-1 mt-2">
                                                    <div className="col-3"><input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" value="{1}" onChange={(v) => { }} /></div>
                                                    <div className="col-7"><a href="#" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart"><img src={CartIcon} alt="cart" width={24} height={24} /> Add to Cart</a></div>
                                                    <div className="col-2"><a href="#" className="btn btn-outline-dark rounded-1 p-2 fs-6"><img src={WishlistIcon} alt="wishlist" width={24} height={24} /></a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="product-item">
                                        <figure>
                                            <a href="index.html" title="Product Title">
                                                <img src="images/product-thumb-2.png" alt="Product Thumbnail" className="tab-image" />
                                            </a>
                                        </figure>
                                        <div className="d-flex flex-column text-center">
                                            <h3 className="fs-6 fw-normal">Whole Grain Oatmeal</h3>
                                            <div>
                                                <span className="rating">
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-half"></use></svg>
                                                </span>
                                                <span>(41)</span>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <del>$54.00</del>
                                                <span className="text-dark fw-semibold">$50.00</span>
                                                <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">10% OFF</span>
                                            </div>
                                            <div className="button-area p-3 pt-0">
                                                <div className="row g-1 mt-2">
                                                    <div className="col-3"><input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" value="{1}" onChange={(v) => { }} /></div>
                                                    <div className="col-7"><a href="#" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart"><svg width="18" height="18"><use xlinkHref="#cart"></use></svg> Add to Cart</a></div>
                                                    <div className="col-2"><a href="#" className="btn btn-outline-dark rounded-1 p-2 fs-6"><svg width="18" height="18"><use xlinkHref="#heart"></use></svg></a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="product-item">
                                        <figure>
                                            <a href="index.html" title="Product Title">
                                                <img src="images/product-thumb-3.png" alt="Product Thumbnail" className="tab-image" />
                                            </a>
                                        </figure>
                                        <div className="d-flex flex-column text-center">
                                            <h3 className="fs-6 fw-normal">Sharp Cheddar Cheese Block</h3>
                                            <div>
                                                <span className="rating">
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-half"></use></svg>
                                                </span>
                                                <span>(32)</span>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <del>$14.00</del>
                                                <span className="text-dark fw-semibold">$12.00</span>
                                                <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">10% OFF</span>
                                            </div>
                                            <div className="button-area p-3 pt-0">
                                                <div className="row g-1 mt-2">
                                                    <div className="col-3"><input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" value="{1}" onChange={(v) => { }} /></div>
                                                    <div className="col-7"><a href="#" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart"><svg width="18" height="18"><use xlinkHref="#cart"></use></svg> Add to Cart</a></div>
                                                    <div className="col-2"><a href="#" className="btn btn-outline-dark rounded-1 p-2 fs-6"><svg width="18" height="18"><use xlinkHref="#heart"></use></svg></a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="product-item">
                                        <figure>
                                            <a href="index.html" title="Product Title">
                                                <img src="images/product-thumb-4.png" alt="Product Thumbnail" className="tab-image" />
                                            </a>
                                        </figure>
                                        <div className="d-flex flex-column text-center">
                                            <h3 className="fs-6 fw-normal">Organic Baby Spinach</h3>
                                            <div>
                                                <span className="rating">
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-half"></use></svg>
                                                </span>
                                                <span>(222)</span>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <del>$24.00</del>
                                                <span className="text-dark fw-semibold">$18.00</span>
                                                <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">10% OFF</span>
                                            </div>
                                            <div className="button-area p-3 pt-0">
                                                <div className="row g-1 mt-2">
                                                    <div className="col-3"><input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" value="{1}" onChange={(v) => { }} /></div>
                                                    <div className="col-7"><a href="#" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart"><svg width="18" height="18"><use xlinkHref="#cart"></use></svg> Add to Cart</a></div>
                                                    <div className="col-2"><a href="#" className="btn btn-outline-dark rounded-1 p-2 fs-6"><svg width="18" height="18"><use xlinkHref="#heart"></use></svg></a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="product-item">
                                        <figure>
                                            <a href="index.html" title="Product Title">
                                                <img src="images/product-thumb-5.png" alt="Product Thumbnail" className="tab-image" />
                                            </a>
                                        </figure>
                                        <div className="d-flex flex-column text-center">
                                            <h3 className="fs-6 fw-normal">Organic Spinach Leaves (Fresh Produce)</h3>
                                            <div>
                                                <span className="rating">
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-half"></use></svg>
                                                </span>
                                                <span>(222)</span>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <del>$24.00</del>
                                                <span className="text-dark fw-semibold">$18.00</span>
                                                <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">10% OFF</span>
                                            </div>
                                            <div className="button-area p-3 pt-0">
                                                <div className="row g-1 mt-2">
                                                    <div className="col-3"><input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" value="{1}" onChange={(v) => { }} /></div>
                                                    <div className="col-7"><a href="#" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart"><svg width="18" height="18"><use xlinkHref="#cart"></use></svg> Add to Cart</a></div>
                                                    <div className="col-2"><a href="#" className="btn btn-outline-dark rounded-1 p-2 fs-6"><svg width="18" height="18"><use xlinkHref="#heart"></use></svg></a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="product-item">
                                        <figure>
                                            <a href="index.html" title="Product Title">
                                                <img src="images/product-thumb-6.png" alt="Product Thumbnail" className="tab-image" />
                                            </a>
                                        </figure>
                                        <div className="d-flex flex-column text-center">
                                            <h3 className="fs-6 fw-normal">Fresh Salmon</h3>
                                            <div>
                                                <span className="rating">
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-half"></use></svg>
                                                </span>
                                                <span>(222)</span>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <del>$24.00</del>
                                                <span className="text-dark fw-semibold">$18.00</span>
                                                <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">10% OFF</span>
                                            </div>
                                            <div className="button-area p-3 pt-0">
                                                <div className="row g-1 mt-2">
                                                    <div className="col-3"><input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" value="{1}" onChange={(v) => { }} /></div>
                                                    <div className="col-7"><a href="#" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart"><svg width="18" height="18"><use xlinkHref="#cart"></use></svg> Add to Cart</a></div>
                                                    <div className="col-2"><a href="#" className="btn btn-outline-dark rounded-1 p-2 fs-6"><svg width="18" height="18"><use xlinkHref="#heart"></use></svg></a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="product-item">
                                        <figure>
                                            <a href="index.html" title="Product Title">
                                                <img src="images/product-thumb-7.png" alt="Product Thumbnail" className="tab-image" />
                                            </a>
                                        </figure>
                                        <div className="d-flex flex-column text-center">
                                            <h3 className="fs-6 fw-normal">Imported Italian Spaghetti Pasta</h3>
                                            <div>
                                                <span className="rating">
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-half"></use></svg>
                                                </span>
                                                <span>(222)</span>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <del>$24.00</del>
                                                <span className="text-dark fw-semibold">$18.00</span>
                                                <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">10% OFF</span>
                                            </div>
                                            <div className="button-area p-3 pt-0">
                                                <div className="row g-1 mt-2">
                                                    <div className="col-3"><input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" value="{1}" onChange={(v) => { }} /></div>
                                                    <div className="col-7"><a href="#" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart"><svg width="18" height="18"><use xlinkHref="#cart"></use></svg> Add to Cart</a></div>
                                                    <div className="col-2"><a href="#" className="btn btn-outline-dark rounded-1 p-2 fs-6"><svg width="18" height="18"><use xlinkHref="#heart"></use></svg></a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="product-item">
                                        <figure>
                                            <a href="index.html" title="Product Title">
                                                <img src="images/product-thumb-8.png" alt="Product Thumbnail" className="tab-image" />
                                            </a>
                                        </figure>
                                        <div className="d-flex flex-column text-center">
                                            <h3 className="fs-6 fw-normal">Granny Smith Apples</h3>
                                            <div>
                                                <span className="rating">
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-half"></use></svg>
                                                </span>
                                                <span>(222)</span>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <del>$24.00</del>
                                                <span className="text-dark fw-semibold">$18.00</span>
                                                <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">10% OFF</span>
                                            </div>
                                            <div className="button-area p-3 pt-0">
                                                <div className="row g-1 mt-2">
                                                    <div className="col-3"><input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" value="{1}" onChange={(v) => { }} /></div>
                                                    <div className="col-7"><a href="#" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart"><svg width="18" height="18"><use xlinkHref="#cart"></use></svg> Add to Cart</a></div>
                                                    <div className="col-2"><a href="#" className="btn btn-outline-dark rounded-1 p-2 fs-6"><svg width="18" height="18"><use xlinkHref="#heart"></use></svg></a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="product-item">
                                        <figure>
                                            <a href="index.html" title="Product Title">
                                                <img src="images/product-thumb-9.png" alt="Product Thumbnail" className="tab-image" />
                                            </a>
                                        </figure>
                                        <div className="d-flex flex-column text-center">
                                            <h3 className="fs-6 fw-normal">Organic 2% Reduced Fat Milk </h3>
                                            <div>
                                                <span className="rating">
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-half"></use></svg>
                                                </span>
                                                <span>(222)</span>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <del>$24.00</del>
                                                <span className="text-dark fw-semibold">$18.00</span>
                                                <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">10% OFF</span>
                                            </div>
                                            <div className="button-area p-3 pt-0">
                                                <div className="row g-1 mt-2">
                                                    <div className="col-3"><input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" value="{1}" onChange={(v) => { }} /></div>
                                                    <div className="col-7"><a href="#" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart"><svg width="18" height="18"><use xlinkHref="#cart"></use></svg> Add to Cart</a></div>
                                                    <div className="col-2"><a href="#" className="btn btn-outline-dark rounded-1 p-2 fs-6"><svg width="18" height="18"><use xlinkHref="#heart"></use></svg></a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="product-item">
                                        <figure>
                                            <a href="index.html" title="Product Title">
                                                <img src="images/product-thumb-10.png" alt="Product Thumbnail" className="tab-image" />
                                            </a>
                                        </figure>
                                        <div className="d-flex flex-column text-center">
                                            <h3 className="fs-6 fw-normal">Greek Style Plain Yogurt</h3>
                                            <div>
                                                <span className="rating">
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-full"></use></svg>
                                                    <svg width="18" height="18" className="text-warning"><use xlinkHref="#star-half"></use></svg>
                                                </span>
                                                <span>(222)</span>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <del>$24.00</del>
                                                <span className="text-dark fw-semibold">$18.00</span>
                                                <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">10% OFF</span>
                                            </div>
                                            <div className="button-area p-3 pt-0">
                                                <div className="row g-1 mt-2">
                                                    <div className="col-3"><input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" value="{1}" onChange={(v) => { }} /></div>
                                                    <div className="col-7"><a href="#" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart"><svg width="18" height="18"><use xlinkHref="#cart"></use></svg> Add to Cart</a></div>
                                                    <div className="col-2"><a href="#" className="btn btn-outline-dark rounded-1 p-2 fs-6"><svg width="18" height="18"><use xlinkHref="#heart"></use></svg></a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>


                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}