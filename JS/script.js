const loadCard = async (category_id = 1000) => {
    console.log(category_id);
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${category_id}`);
    const data = await res.json();
    const videos = data.data;
    console.log(videos);
    displayVideos(videos);
};


const displayVideos = videos => {
    const cardContainer = document.getElementById('card-container');
    // Clear the existing content in cardContainer
    cardContainer.innerHTML = '';


    if (videos.length !== 0) {
        videos.forEach(video => {
            cardContainer.classList.add('grid', 'grid-cols-1', 'lg:grid-cols-4');


            // Posted date
            function convertSecondsToTimeAgo(seconds) {
                const hours = Math.floor(seconds / 3600);
                const remainingSeconds = seconds % 3600;
                const minutes = Math.floor(remainingSeconds / 60);


                let result = '';
                if (hours > 0) {
                    result += `${hours}hrs `;
                }
                if (minutes > 0) {
                    result += `${minutes}min `;
                }


                if (result === '') {
                    result = 'just now';
                } else {
                    result += 'ago';
                }


                return result;
            }


            // Example usage:
            const postedDateSeconds = video.others.posted_date;
            const convertedTimeAgo = convertSecondsToTimeAgo(postedDateSeconds);


            // Create a div for the current video card
            const videoCard = document.createElement('div');
            videoCard.classList.add('card', 'mx-auto');
            videoCard.innerHTML = `
                <figure class="relative cursor-pointer">
                    <img id="card_thumbnail" src="${video?.thumbnail}" alt="" class="rounded-xl w-[300px] h-[200px]" />
                    <h1 class="absolute rounded bottom-[10px] right-[10px] py-1 px-2 bg-black text-white text-[10px]">${convertedTimeAgo}</h1>
                </figure>
                <div class="card-body pt-[20px] pl-0">
                    <div class="card-title">
                        <img id="card_profile_picture_${video.id}" src="${video.authors[0].profile_picture}" alt="" class="rounded-full w-[40px] h-[40px]">
                        <h1 id="card-title">${video?.title}</h1>
                    </div>
                    <div class="flex flex-row justify-start gap-2">
                        <div>
                            <p class="w-auto card_profile_name pl-[46px] text-gray-500 text-[16px]">${video.authors[0].profile_name}</p>
                        </div>
                        <div >
                            <img id="card_verified_${video.authors[0].verified}"  src="./images/verified.png" alt="" class="w-[20px] h-[20px]">
                        </div>
                    </div>
                    <div class="card-actions justify-start">
                        <p class="card-view pl-[46px] text-gray-500 text-[16px]">${video.others.views}</p>
                    </div>
                </div>
            `;


            // Append the div element to the card container
            cardContainer.appendChild(videoCard);


            // Check if the video is verified and show/hide the verified icon for the current card
            const cardVerified = document.getElementById(`card_verified_${video.authors[0].verified}`);
            const verified = cardVerified;
            if (verified === true) {
                console.log('show');
                cardVerified.classList.remove('hidden');
            } else {
                console.log('not show');
                cardVerified.classList.add('hidden');
            }
             
        });
    } else {
        const errorCard = document.createElement('div');


        cardContainer.classList.remove('grid', 'grid-cols-4');


        errorCard.classList.add('error-card', 'flex', 'flex-col', 'items-center', 'justify-center', 'h-[400px]');
        errorCard.innerHTML = `
            <img class="w-[140px] h-[140px]" src="./Icon.png" alt="">
            <div class="text-center">
                <h1 class="text-[32px] font-bold">Oops!! Sorry, There is no </h1>
                <h1 class="text-[32px] font-bold">content here</h1>
            </div>
        `;


        // Append the div element to the card container
        cardContainer.appendChild(errorCard);
    }
};


const btnAll = document.getElementById('btn-all');
btnAll.addEventListener('click', () => {
    loadCard(1000);
});


const btnMusic = document.getElementById('btn-music');
btnMusic.addEventListener('click', () => {
    loadCard(1001);
});


const btnComedy = document.getElementById('btn-comedy');
btnComedy.addEventListener('click', () => {
    loadCard(1003);
});


const btnDrawing = document.getElementById('btn-drawing');
btnDrawing.addEventListener('click', () => {
    loadCard(1005);
});


document.addEventListener('DOMContentLoaded', () => {
    loadCard();
});



