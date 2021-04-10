import React from 'react';
import cn from 'classnames';

import { Avatar, Button } from '@components/ui';
import useUser from '@lib/useUser';

const stats = [
  { label: 'all experiments', value: 42 },
  { label: 'running experiments', value: 372 },
  { label: 'team', value: 'James, Ryan' },
  { label: 'Description', value: 'Sentiment Analysis on Financial Data' },
];

const experiments = [
  {
    project: 'Transformer',
    name: 'ex1',
    epoch: {
      current: 13,
      total: 77,
    },
    loss: 2.134,
    evaluation: 78.3,
    time: '1.32.24',
  },
  {
    project: 'Transformer',
    name: 'ex3',
    epoch: {
      current: 6,
      total: 77,
    },
    loss: 1.879,
    evaluation: 88.3,
    time: '0:16:24',
  },
  {
    project: 'Transformer',
    name: 'ex14',
    epoch: {
      current: 42,
      total: 77,
    },
    loss: 1.233,
    evaluation: 91.3,
    time: '4:15:24',
  },
  {
    project: 'Resnet',
    name: 'ex1',
    epoch: {
      current: 13,
      total: 77,
    },
    loss: 2.134,
    evaluation: 78.3,
    time: '1.32.24',
  },
  {
    project: 'Resnet',
    name: 'ex3',
    epoch: {
      current: 6,
      total: 77,
    },
    loss: 1.879,
    evaluation: 88.3,
    time: '0:16:24',
  },
  {
    project: 'Resnet',
    name: 'ex14',
    epoch: {
      current: 42,
      total: 77,
    },
    loss: 1.233,
    evaluation: 91.3,
    time: '4:15:24',
  },
];

const ProjectOverviewPage = () => {
  const [feeds, setFeeds] = React.useState<
    { user: UserInfo; time: string; content: string }[]
  >([]);

  const { user } = useUser({ redirectTo: '/' });

  React.useEffect(() => {
    if (user) {
      setFeeds([
        {
          user,
          time: '1 hour ago',
          content: 'Experiments Ended. (Transformer/ex2)',
        },
        {
          user,
          time: 'Today, 10:30',
          content: 'Highest Valid Accuracy Reached. (Resnet/ex13)',
        },
        {
          user,
          time: 'April 1, 11:18',
          content: 'Epoch 65 Ended. (Resnet/ex13)',
        },
        {
          user,
          time: 'Mar 31, 19:33',
          content: 'Experiments Stopped. (TransformerBig/ex7)',
        },
      ]);
    }
  }, [user]);

  return (
    <div className="bg-gray-100 min-h-full">
      <div className="max-w-screen-xl mx-auto">
        <div className="pt-10">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-medium capitalize">Your Stats</h3>
            <Button className="capitalize" color="lightBlue">
              new experiment
            </Button>
          </div>
          <dl className="mt-6 grid gap-5 grid-cols-4">
            {stats.map((stat, idx) => (
              <div
                key={`stat-${idx}`}
                className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6 flex flex-col justify-center"
              >
                <dt className="text-sm font-medium text-gray-500 truncate capitalize">
                  {stat.label}
                </dt>
                <dd
                  className={cn('mt-1', {
                    'text-3xl font-semibold text-gray-900':
                      typeof stat.value === 'number',
                    'text-lg font-medium text-gray-900':
                      typeof stat.value !== 'number',
                  })}
                >
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="mt-12 grid grid-cols-12 gap-4">
          <div className="col-span-4">
            <div className="bg-white rounded-lg shadow-lg p-4 overflow-hidden">
              <h3 className="ml-1 mt-2 text-xl font-medium capitalize">
                feeds
              </h3>
              <ul className="divide-y divide-gray-200">
                {feeds.map((feed, idx) => (
                  <li key={`feed-${idx}`} className="py-4">
                    <div className="flex space-x-3">
                      <Avatar size="sm" src={feed.user.profile} />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium">
                            {feed.user.name}
                          </h3>
                          <p className="text-sm text-gray-500">{feed.time}</p>
                        </div>
                        <p className="text-sm text-gray-500">{feed.content}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-span-8">
            <div className="bg-white rounded-lg shadow-lg p-4 overflow-hidden">
              <h3 className="ml-1 mb-2 text-xl font-medium capitalize">
                currently running experiments
              </h3>
              <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-4 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Project
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Name
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Epoch
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Loss
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Eval
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Time
                            </th>
                            <th scope="col" className="relative px-6 py-3">
                              <span className="sr-only">Edit</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {experiments.map(
                            (
                              { project, name, epoch, loss, evaluation, time },
                              idx,
                            ) => (
                              <tr
                                key={`exp-${idx}`}
                                className={'bg-white even:bg-gray-50'}
                              >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {project}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {epoch.current}/{epoch.total}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {loss}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {evaluation}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {time}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <a
                                    href="#"
                                    className="text-indigo-600 hover:text-indigo-900"
                                  >
                                    View
                                  </a>
                                </td>
                              </tr>
                            ),
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProjectOverviewPage.variant = 'project';
export default ProjectOverviewPage;
