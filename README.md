# Farmersworld bot

Simple farmersworld bot for:

- Claiming tools, membership cards, crops
- Raising and feeding animals

Can be launched via VScode (on local host) or used from [web app](https://fw-claim-bot.web.app/)

# Important

On some RPC servers account chest data returned from fetch request is not always accurate it leads to problems with feeding animals. You need to check sometimes that RPC server on witch bot currently working fetching data correctly.
Best server is - https://chain.wax.io

## Installation

1. Install nodejs latest version download [here](https://nodejs.org/en/)
2. Clone repository

```bash
git clone https://github.com/Splash-07/fw-bot
```

3. Install all dependencies

```bash
npm i
```

4. Start bot on localhost

```bash
npm start
```

## Features

- Claim tools, membership cards, crops
- Raising animals
- Feeding chicks and dairy cow (optionally)
- Restore energy (optionally)
- Repair tools (optionally)
- Storing charges depending on quantity and grade of membership cards (less CPU usage)
- Storing membership cards depending on the rarity of the card (less CPU usage) (optionally)

## Bot workflow

1. Login with wax.wallet
2. Fetch blockchain data with eosio rpc api
3. Auto fetch data every 26sec
4. Finding asset with lowest cooldown (adjusted according mbs cards that you have, checking if charges can be stored)
5. If cooldown is over -> preforming energy restore action | repair action if conditions are meet -> performing claim | feed action
6. If there no food for feeding animals -> skipping this asset
7. Repeating 4th - 6th steps


##

Pull requests are welcome. For feature requests and bug reports, please open an issue first to discuss what you would like to change.

Consider supporting next projects - ivrjw.wam

![Alt text](/public/FWbot.png)
