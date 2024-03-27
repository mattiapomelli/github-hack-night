import { createConnectTransport } from '@connectrpc/connect-node';
import { getNeosyncClient } from '@neosync/sdk';
import { Command } from 'commander';
import Ora from 'ora';

const NEOSYNC_ACCOUNT_ID = '20d90182-d5a1-4b32-8f61-60d45861a574';

export default new Command()
  .name('replexica')
  .description('Replexica CLI')
  .helpOption('-h, --help', 'Show help')
  .action(async () => {
    const spinner = Ora();

    const neosyncClient = getNeosyncClient({
      getAccessToken: () => 'neo_at_v1_030fc7f0-04be-426f-832c-dd72f21251ef',
      getTransport(interceptors) {
        return createConnectTransport({ 
          baseUrl: 'https://neosync-api.svcs.neosync.dev/',
          httpVersion: '2',
          interceptors: interceptors,
        });
      },
    });

    spinner.start('Getting system transformers...');
    const result = await neosyncClient.transformers.getUserDefinedTransformers({ accountId: NEOSYNC_ACCOUNT_ID });
    spinner.succeed('Got system transformers');
    console.log(result);

    console.log(result);
  })
  .parse(process.argv);
