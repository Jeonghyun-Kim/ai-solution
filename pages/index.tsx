import React from 'react';
import NextImage from 'next/image';

const teamMembers = [
  {
    name: 'Lindsay Walton',
    position: 'Front-end Developer',
    url: '/images/profile/1.jpg',
  },
  {
    name: 'Courtney Henry',
    position: 'Designer',
    url: '/images/profile/2.jpg',
  },
  {
    name: 'Tom Cook',
    position: 'Director, Product Development',
    url: '/images/profile/3.jpg',
  },
];

const IndexPage = () => {
  return (
    <div className="mx-auto max-w-screen-lg text-2xl pb-24">
      <div className="my-8">
        <NextImage
          src="/images/fish.jpg"
          layout="responsive"
          width={1500}
          height={500}
          objectFit="cover"
        />
      </div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
      <div className="mt-16">
        <h3 className="text-3xl font-bold">Our Team</h3>
        <p className="mt-2 text-lg text-gray-600">
          Odio nisi, lectus dis nulla. Ultrices maecenas vitae rutrum dolor
          ultricies donec risus sodales. Tempus quis et.
        </p>
      </div>
      <ul className="my-8 space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8">
        {teamMembers.map((member) => (
          <li key={`${member.name}`}>
            <div className="space-y-4">
              <div className="shadow-2xl rounded-lg overflow-hidden">
                <NextImage
                  src={member.url}
                  layout="responsive"
                  width={600}
                  height={600}
                  objectFit="cover"
                  objectPosition="top center"
                />
              </div>
              <div className="space-y-2">
                <div className="text-lg leading-6 font-medium space-y-1">
                  <h3>{member.name}</h3>
                  <p className="text-primary">{member.position}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IndexPage;
