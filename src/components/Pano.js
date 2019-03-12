import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';
import Marzipano from 'marzipano';

import './Pano.css';

class Pano extends PureComponent {
    static displayName = 'Pano';

    static propTypes = {
        data: PropTypes.object.isRequired,
    };

    componentDidMount() {
        const {
            data: {
                settings: { mouseViewMode },
                scenes,
            },
        } = this.props;

        const viewerOpts = {
            controls: { mouseViewMode },
        };

        this.viewer = new Marzipano.Viewer(this.pano, viewerOpts);

        const panoScenes = scenes.map((data) => {
            const { id, initialViewParameters, levels, faceSize } = data;
            // You need use a URL hosted with pictures /tiles
            const urlPrefix = "//www.marzipano.net/media";
            const source = Marzipano.ImageUrlSource.fromString(
                urlPrefix + "/" + id + "/{z}/{f}/{y}/{x}.jpg",
                { cubeMapPreviewUrl: urlPrefix + "/" + id + "/preview.jpg" }
            );
            var limiter = Marzipano.RectilinearView.limit.traditional(faceSize, 100*Math.PI/180, 120*Math.PI/180);
            var view = new Marzipano.RectilinearView(initialViewParameters, limiter);
            var geometry = new Marzipano.CubeGeometry(levels);
    
            const scene = this.viewer.createScene({
                source: source,
                geometry: geometry,
                view: view,
                pinFirstLevel: true,
            });
    
            return {
                data: data,
                scene: scene,
                view: view,
            };
        });

        panoScenes[0].scene.switchTo();
    }

    render() {
        return <div className="pano-container" ref={pano => this.pano = pano} />;
    }
};

export default Pano;