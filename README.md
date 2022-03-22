# Farmersworld claim-bot

Simple farmersworld claim-bot for novices.

## Installation

1. Clone repository

```bash
git clone Splash-07/fw-bot
```

2. Install all dependencies

```bash
npm i
```

3. Start bot on localhost

```bash
npm start
```

## Features

- Claim tools, membership cards;
- Restore energy (optionally);
- Repair tools (optionally);
- Depending on quantity and grade of membership cards storing charges (less CPU usage).

## Bot workflow

![Alt text](/public/FWbot.png)

1. Login with wax.wallet;
2. Fetch blockchain data with eosio rpc api;
3. Auto fetch data every 40sec;
4. Finding tool or mbs card with lowest cooldown (adjusted according mbs cards that you have, checking if charges can be stored);
5. If cooldown is over -> claim action performing. If error occurs -> will try again in 40sec;
6. Repeating 4th and 5th steps.

## Contributing

Pull requests are welcome. For feature requests and bug reports, please open an issue first to discuss what you would like to change.

More profound version of farmersworld bot [by shakhruz](https://github.com/shakhruz/angelfarmers-ui).
