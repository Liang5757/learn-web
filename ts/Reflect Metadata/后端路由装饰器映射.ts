import 'reflect-metadata'

const METHOD_METADATA = 'method'
const PATH_METADATA = 'path'
// 装饰器工厂函数,接受路由的路径path返回一个装饰器
const Controller = (path: string): ClassDecorator => {
  return target => {
    Reflect.defineMetadata(PATH_METADATA, path, target);
  }
}

// 装饰器工厂函数,首先接受一个方法,比如get/post,如何再接受一个路由路径,返回一个携带了上述两个信息的装饰器
const createMappingDecorator = (method: string) => (path: string): MethodDecorator => {
  return (target, key, descriptor) => {
    Reflect.defineMetadata(PATH_METADATA, path, descriptor.value!);
    Reflect.defineMetadata(METHOD_METADATA, method, descriptor.value!);
  }
}

const Get = createMappingDecorator('GET');
const Post = createMappingDecorator('POST');


function mapRoute(instance: Object) {
  const prototype = Object.getPrototypeOf(instance);

  // 筛选出类的 methodName
  const methodsNames = Object.getOwnPropertyNames(prototype)
  return methodsNames.map(methodName => {
    const fn = prototype[methodName];
    
    // 取出定义的 metadata
    const route = Reflect.getMetadata(PATH_METADATA, fn);
    const method = Reflect.getMetadata(METHOD_METADATA, fn);
    return {
      route,
      method,
      fn,
      methodName
    }
  })
}

// 实现效果
@Controller('/article')
class Home {
  @Get('/content')
  someGetMethod() {
    return 'hello world';
  }
  
  @Post('/comment')
  somePostMethod() {}
}

const info = mapRoute(new Home());
console.log(info);
