source 'https://rubygems.org'

# jekyll-scholar 5.16 uses File.exists? which was removed in Ruby 3.2.
# This shim runs at Bundler load time (before Jekyll's safe mode blocks _plugins/).
class File
  class << self
    alias_method :exists?, :exist? unless respond_to?(:exists?)
  end
end

group :jekyll_plugins do
    gem 'github-pages'
    gem 'bibtex-ruby', '4.4.6'
    gem 'jekyll'
    gem 'jekyll-email-protect'
    gem 'jekyll-github-metadata'
    gem 'jekyll-paginate-v2'
    gem 'jekyll-scholar'
    gem 'jekyll-twitter-plugin'
    gem 'jemoji'
    gem 'unicode_utils'
end
