<p align="center">
  <img alt="snap" src="https://i.imgur.com/NRZ60OE.png" width="675">
</p>

<p align="center">
  Simple and flexible boilerplate management
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/snap"><img alt="npm version" src="https://img.shields.io/npm/v/snap.svg?style=for-the-badge&maxAge=7200&colorB=FF2758"></a>
  <a href="https://www.npmjs.com/package/snap"><img alt="total downloads" src="https://img.shields.io/npm/dt/snap.svg?style=for-the-badge&maxAge=7200&colorB=06E19A"></a>
  <a href="https://github.com/jolaleye/snap/blob/master/CONTRIBUTING.md"><img alt="prs welcome" src="https://img.shields.io/badge/PRs-welcome-32A4FD.svg?style=for-the-badge"></a>
</p>

Snap allows you to save, organize, and use boilerplates quickly and easily. When you find yourself using the same starting files for multiple projects just run `snap save starter`, and when you need to use that starter project again: `snap starter my-project`. It's that easy.

## Installation

```
npm install -g snap
```

## Usage

### save

Saving a boilerplate with Snap is quick and easy:

```
snap save <name> [source] [options]
```

`<name>` should be something short and memorable so that you can use it later. `[source]` can be a local path to a directory (e.g. `./starter`) or a Git repository URL (e.g. `https://github.com/user/starter.git`). Providing a source is optional. If you don't, the current working directory will be saved.

**Options:**
  - `-o`, `--overwrite`: Overwrite an existing boilerplate that has the same name

### snap

When you want to use a boilerplate you have saved, run:

```
snap <boilerplate-name> <project-directory> [options]
```

`<boilerplate-name>` should be the name of a boilerplate you have saved. `<project-directory>` should be a local path to the project you want to create. For example, if you want to create a project called *my-project* with a boilerplate called *starter*, you should run `snap starter ./my-project`.

**Options:**
  - `-i`, `--install`: Automatically run `npm install` after creating the project

### ls

If you want to see what you have saved:

```
snap ls
```

You'll either get a nice list of names or a message telling you that you don't have anything saved yet.

### show

To view the file structure of a boilerplate:

```
snap show <name>
```

`<name>` should be the name of a boilerplate you have saved.

### rm

When you no longer need a boilerplate and want to delete it:

```
snap rm <names...>
```

You can provide one or more names of boilerplates you have saved.

## Contributing

Open source projects such as Snap are powered by the community. Read below to find out how you can contribute.

### [Code of Conduct](CODE_OF_CONDUCT.md)

Always try your best to make a positive impact on this project and its community. By participating, you are expected to uphold the Code of Conduct.

### [Contributing Guide](CONTRIBUTING.md)

Read the contributing guide to learn how you can report bugs, suggest features, and contribute changes.

## License

Snap is [MIT licensed](LICENSE).
