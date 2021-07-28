define(["exports","./when-54c2dc71","./Math-fc8cecf5","./Cartesian2-a8ce88a9","./EllipsoidTangentPlane-97448adb","./PolygonPipeline-9522bda7","./PolylinePipeline-45af48b7"],function(e,C,A,m,w,b,E){"use strict";var i={};var O=new m.Cartographic,M=new m.Cartographic;function L(e,i,t,n){var r=i.length;if(!(r<2)){var o=C.defined(n),a=C.defined(t),l=!0,h=new Array(r),s=new Array(r),g=new Array(r),p=i[0];h[0]=p;var d=e.cartesianToCartographic(p,O);a&&(d.height=t[0]),l=l&&d.height<=0,s[0]=d.height,g[0]=o?n[0]:0;for(var c,P,u=1,v=1;v<r;++v){var y=i[v],f=e.cartesianToCartographic(y,M);a&&(f.height=t[v]),l=l&&f.height<=0,c=d,P=f,A.CesiumMath.equalsEpsilon(c.latitude,P.latitude,A.CesiumMath.EPSILON14)&&A.CesiumMath.equalsEpsilon(c.longitude,P.longitude,A.CesiumMath.EPSILON14)?d.height<f.height&&(s[u-1]=f.height):(h[u]=y,s[u]=f.height,g[u]=o?n[v]:0,m.Cartographic.clone(f,d),++u)}if(!(l||u<2))return h.length=u,s.length=u,g.length=u,{positions:h,topHeights:s,bottomHeights:g}}}var F=new Array(2),H=new Array(2),T={positions:void 0,height:void 0,granularity:void 0,ellipsoid:void 0};i.computePositions=function(e,i,t,n,r,o){var a,l=L(e,i,t,n);if(C.defined(l)){i=l.positions,t=l.topHeights,n=l.bottomHeights,3<=i.length&&(a=w.EllipsoidTangentPlane.fromPoints(i,e).projectPointsOntoPlane(i),b.PolygonPipeline.computeWindingOrder2D(a)===b.WindingOrder.CLOCKWISE&&(i.reverse(),t.reverse(),n.reverse()));var h,s,g=i.length,p=g-2,d=A.CesiumMath.chordLength(r,e.maximumRadius),c=T;if(c.minDistance=d,c.ellipsoid=e,o){for(var P=0,u=0;u<g-1;u++)P+=E.PolylinePipeline.numberOfPoints(i[u],i[u+1],d)+1;h=new Float64Array(3*P),s=new Float64Array(3*P);var v=F,y=H;c.positions=v,c.height=y;var f=0;for(u=0;u<g-1;u++){v[0]=i[u],v[1]=i[u+1],y[0]=t[u],y[1]=t[u+1];var m=E.PolylinePipeline.generateArc(c);h.set(m,f),y[0]=n[u],y[1]=n[u+1],s.set(E.PolylinePipeline.generateArc(c),f),f+=m.length}}else c.positions=i,c.height=t,h=new Float64Array(E.PolylinePipeline.generateArc(c)),c.height=n,s=new Float64Array(E.PolylinePipeline.generateArc(c));return{bottomPositions:s,topPositions:h,numCorners:p}}},e.WallGeometryLibrary=i});
