

const PageParallax = ({ bgImage, pageTitle }) => {


    return (
        <div>
            {/* <Parallax
                bgImage={bgImage}
                strength={200}
                renderLayer={(percentage) => (
                    <div>
                        <div
                            style={{
                                background: `rgba(19, 67, 145, ${percentage * 1})`,
                                borderTopRightRadius: '40%',
                                borderBottomLeftRadius: '40%',
                                transform: 'translate(-50%, -50%)',
                                width: percentage * 500,
                                height: percentage * 500,
                            }}

                            className='absolute top-[50%] left-[50%] border-2 border-white'
                        />
                    </div>
                )}
            >
                <div style={{ height: 500 }}>
                    <div style={insideStyles}>
                        <h2 className='text-center text-white text-3xl uppercase font-semibold'>
                            {pageTitle}
                        </h2>
                    </div>
                </div>
            </Parallax> */}
            <div className="bg-fixed min-h-[300px] bg-no-repeat transition-all duration-300" style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',

            }}>
                <div className=' bg-[#134391] h-[300px] flex items-center justify-center bg-opacity-90  p-5'>
                    <h2 className='text-3xl font-semibold text-center text-white'>{pageTitle}</h2>
                </div>
            </div>
        </div>
    );
};

export default PageParallax;