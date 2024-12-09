import React from 'react';

const researchPapers = [
    {
      id: 1,
      title: 'The Effect of Caffeine on Cognition',
      link: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4842255/',
      image: 'https://www.nutraingredients-asia.com/var/wrbm_gb_food_pharma/storage/images/_aliases/wrbm_large/publications/food-beverage-nutrition/nutraingredients-asia.com/news/research/coffee-consumption-has-limited-effects-on-cognitive-function-in-later-life-meta-analysis/8355224-1-eng-GB/Coffee-consumption-has-limited-effects-on-cognitive-function-in-later-life-Meta-analysis.jpg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
  
  
    {
      id: 4,
      title: 'The Development of Self-Driving Cars',
      link: 'https://www.technologyreview.com/2022/01/27/1045142/self-driving-cars-are-getting-closer-to-reality/',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7M9qyzkleeNbuiNKibC_ASdHttVh4b_fikH1VwblSezXbbjPRjRt9DHLZ5CzAX03B5mc&usqp=CAU',
      description: 'Self-driving cars are one of the most promising technologies of our time. They have the potential to revolutionize transportation, making it safer, more efficient, and more accessible.',
    },
    {
      id: 5,
      title: 'The Future of Artificial Intelligence',
      link: 'https://www.technologyreview.com/2022/01/25/1045044/the-future-of-artificial-intelligence-is-bright-but-we-need-to-be-careful/',
      image: 'https://static.theceomagazine.net/wp-content/uploads/2021/05/24085636/ai-future-3300x1479-1-scaled.jpg',
      description: 'Artificial intelligence is one of the most transformative technologies of our time. It has the potential to revolutionize many industries, including healthcare, transportation, and manufacturing.',
    },
  ];

const ResearchPapersSection = () => {
  return (
    <section className="bg-gray-100 py-8">
      <div className="text-center mb-5">
          <p className="text-xs uppercase text-gray-400">Research papers</p>
          <p className="text-cyan-600 text-xl font-bold">
        Some Research Papers that has been done students
          </p>
          <div className="flex items-center justify-center">
            <hr className="half-red-half-white h-1 w-96 " />
          </div>
        </div>
      <div className="container mx-auto px-4">
      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {researchPapers.map((paper) => (
            <div
              key={paper.id}
              className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition duration-300 transform hover:scale-105"
            >
              <img
                src={paper.image}
                alt={paper.title}
                className="w-full h-40 object-cover rounded mb-4"
              />
              <h3 className="text-xl font-bold mb-2">{paper.title}</h3>
              <p className="text-gray-600 mb-4">{paper.description}</p>
              <a
                href={paper.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Read Paper
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchPapersSection;