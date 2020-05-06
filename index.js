const path = require('path');
const fse = require('fs-extra'); // includes `fs` as well
const os = require('os');


const PLUGIN_NAME = 'WriteBuildInfoJsonFilePlugin';



const _config = {
    outputFilename: 'BUILD_INFO.json',
};




export default class WriteBuildInfoJsonFilePlugin {

    /**
     * @param cfg {Object}
     * @return { { outputFilename: string } }
     */
    static config(cfg) {
        return Object.assign(_config, cfg);
    }


    /**
     * @param buildTime {Date} a Date object representing the build time
     * @param gitCommitSha {string} the git SHA short version (~7 chars) of the commit for the build
     * @param extraBuildProperties {Object} any other properties that will be written into the output file
     */
    constructor(buildTime, gitCommitSha, extraBuildProperties = {}) {
        this.buildTime = buildTime;
        this.gitCommitSha = gitCommitSha;
        const dateTimeStr = buildTime.toISOString();

        this.buildProperties = Object.assign({}, extraBuildProperties, {
            buildTime: dateTimeStr,
            gitCommitSha: gitCommitSha,
            buildTag: `${gitCommitSha}@${dateTimeStr}`,
        });
    }


    apply(compiler) {
        const outputPath = compiler.options.output && compiler.options.output.path;

        if ( ! outputPath) {
            console.warn(PLUGIN_NAME, ': `options.output.path` not defined. Plugin DISABLED!');
            return;
        }

        compiler.hooks.done.tap(PLUGIN_NAME, () => {
            fse.writeJsonSync(path.join(outputPath, _config.outputFilename),
                Object.assign({}, this.buildProperties,{
                    osInfo: {
                        arch: os.arch(),
                        platform: os.platform(),
                        release: os.release(),
                        type: os.type(),
                        username: os.userInfo().username,
                    }
                }));
        });
    }
}

